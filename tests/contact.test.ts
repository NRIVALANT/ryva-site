// Tests du formulaire de contact, avec le lanceur intégré à Node (aucune dépendance).
// Aucun email n'est envoyé : l'envoyeur est simulé.
import assert from "node:assert/strict";
import { test } from "node:test";
import { contact } from "../src/content/contact";
import { construireEmail, echapperHtml, surUneLigne } from "../src/lib/contact/email";
import { CHAMP_PIEGE } from "../src/lib/contact/champs";
import { schemaContact, type DonneesContact } from "../src/lib/contact/schema";
import { traiterDemande, type Envoyeur } from "../src/lib/contact/traiter";

const valide: DonneesContact = {
  nom: "Camille Test",
  email: "camille@example.com",
  telephone: "",
  typeStructure: "cabinet",
  etablissement: "",
  message: "Bonjour",
  consentement: true,
};

const config = {
  RESEND_API_KEY: "cle-de-test",
  CONTACT_TO_EMAIL: "reception@example.com",
  CONTACT_FROM_EMAIL: "envoi@example.com",
};

function formulaire(surcharges: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const champs: Record<string, string> = {
    nom: valide.nom,
    email: valide.email,
    telephone: "",
    typeStructure: "cabinet",
    etablissement: "",
    message: "Bonjour",
    consentement: "on",
    [CHAMP_PIEGE]: "",
    ...surcharges,
  };
  for (const [k, v] of Object.entries(champs)) fd.set(k, v);
  return fd;
}

function espion(reponse: { ok: boolean; erreur?: string } = { ok: true }) {
  const appels: Parameters<Envoyeur>[] = [];
  const envoyer: Envoyeur = async (...args) => {
    appels.push(args);
    return reponse;
  };
  return { appels, envoyer };
}

const muet = () => {};

test("une demande valide est envoyée, avec le visiteur en reply-to", async () => {
  const { appels, envoyer } = espion();
  const r = await traiterDemande(formulaire(), config, envoyer, muet);
  assert.equal(r.statut, "succes");
  assert.equal(appels.length, 1);
  const [message, cle] = appels[0];
  assert.equal(message.replyTo, valide.email);
  assert.equal(message.to, config.CONTACT_TO_EMAIL);
  assert.equal(message.from, config.CONTACT_FROM_EMAIL);
  assert.equal(cle, config.RESEND_API_KEY);
  assert.ok(message.text.includes("Camille Test"));
  assert.ok(message.html.includes("Camille Test"));
});

test("le serveur refuse une demande invalide même si le navigateur est contourné", async () => {
  const { appels, envoyer } = espion();
  const r = await traiterDemande(
    formulaire({ nom: "  ", email: "pas-un-email", typeStructure: "pirate", consentement: "" }),
    config,
    envoyer,
    muet,
  );
  assert.equal(r.statut, "erreur-validation");
  if (r.statut === "erreur-validation") {
    assert.deepEqual(Object.keys(r.erreurs).sort(), ["consentement", "email", "nom", "typeStructure"]);
  }
  assert.equal(appels.length, 0);
});

test("champ piège rempli : rejet banal, sans envoi et sans indice", async () => {
  const { appels, envoyer } = espion();
  const r = await traiterDemande(formulaire({ [CHAMP_PIEGE]: "robot" }), config, envoyer, muet);
  assert.deepEqual(r, { statut: "erreur-envoi", message: contact.erreurEnvoi });
  assert.equal(appels.length, 0);
});

test("variable manquante : erreur explicite, jamais de faux succès", async () => {
  for (const manquante of Object.keys(config)) {
    const { appels, envoyer } = espion();
    const journaux: string[] = [];
    const r = await traiterDemande(
      formulaire(),
      { ...config, [manquante]: "" },
      envoyer,
      (m) => journaux.push(m),
    );
    assert.deepEqual(r, { statut: "erreur-envoi", message: contact.erreurConfiguration });
    assert.equal(appels.length, 0);
    assert.ok(journaux[0].includes(manquante));
  }
});

test("échec de Resend : erreur d'envoi, sans donnée personnelle dans les journaux", async () => {
  const journaux: string[] = [];
  const refus = espion({ ok: false, erreur: "validation_error" });
  const r1 = await traiterDemande(formulaire(), config, refus.envoyer, (m) => journaux.push(m));
  const r2 = await traiterDemande(
    formulaire(),
    config,
    async () => {
      throw new TypeError(`réseau coupé pour ${valide.email}`);
    },
    (m) => journaux.push(m),
  );
  assert.equal(r1.statut, "erreur-envoi");
  assert.equal(r2.statut, "erreur-envoi");
  const tout = journaux.join("\n");
  for (const donnee of [valide.nom, valide.email, valide.message, config.RESEND_API_KEY]) {
    assert.ok(!tout.includes(donnee), `donnée présente dans les journaux : ${donnee}`);
  }
});

test("le contenu saisi est échappé dans le HTML", () => {
  assert.equal(echapperHtml(`<a href="x">&'</a>`), "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;");
  const { html } = construireEmail({
    ...valide,
    nom: "<img src=x onerror=alert(1)>",
    message: "<script>alert(1)</script>\nligne 2",
  });
  assert.ok(!html.includes("<img"));
  assert.ok(!html.includes("<script"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("<br>ligne 2"));
});

test("aucun retour à la ligne dans le sujet ni le reply-to", () => {
  assert.equal(surUneLigne("a\r\nBcc: x@example.com"), "a Bcc: x@example.com");
  const { subject, replyTo } = construireEmail({ ...valide, nom: "A\r\nBcc: pirate@example.com" });
  assert.ok(!/[\r\n]/.test(subject));
  assert.ok(!/[\r\n]/.test(replyTo));
});

test("les adresses avec retour à la ligne et les textes trop longs sont refusés", () => {
  assert.equal(schemaContact.safeParse({ ...valide, email: "a@example.com\nBcc: b@example.com" }).success, false);
  assert.equal(schemaContact.safeParse({ ...valide, message: "x".repeat(3001) }).success, false);
  assert.equal(schemaContact.safeParse({ ...valide, telephone: "<script>" }).success, false);
});
