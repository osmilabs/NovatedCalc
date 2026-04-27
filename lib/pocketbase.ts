import PocketBase from "pocketbase";

const baseUrl = process.env.POCKETBASE_URL;

export function getPocketBaseClient() {
  if (!baseUrl) {
    return null;
  }

  return new PocketBase(baseUrl);
}

export async function getPocketBaseAdminClient() {
  const client = getPocketBaseClient();
  const email = process.env.POCKETBASE_ADMIN_EMAIL;
  const password = process.env.POCKETBASE_ADMIN_PASSWORD;

  if (!client || !email || !password) {
    return null;
  }

  await client.admins.authWithPassword(email, password);
  return client;
}
