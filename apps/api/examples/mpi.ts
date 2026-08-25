import "dotenv/config";

const AUTH_BASE_URL = "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1";
const RES_BASE_URL = "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1";

async function get_access_token() {
  const url = `${AUTH_BASE_URL}/accesstoken?grant_type=client_credentials`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.SATUSEHAT_CLIENT_ID!,
      client_secret: process.env.SATUSEHAT_CLIENT_SECRET!,
    }),
  });

  return res.json();
}

const { access_token } = (await get_access_token()) as any;

async function search_patient(id: string) {
  const id_param = encodeURIComponent(`https://fhir.kemkes.go.id/id/nik|${id}`);
  const url = `${RES_BASE_URL}/Patient?identifier=${id_param}`;

  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  return res.json();
}

async function patient_detail(id: string) {
  const url = `${RES_BASE_URL}/Patient/${id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

// console.log(JSON.stringify(await search_patient("9271060312000001"), null, 2));
console.log(JSON.stringify(await patient_detail("P02478375538"), null, 2));
