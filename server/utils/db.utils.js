export function connectDB(client, url) {
  const connection = new client(url);
  return connection;
}

export async function selectDB(connection, dbName) {
  return await connection.db(dbName);
}

export async function closeConnection(connection) {
  await connection.close();
}
