export async function connectDB(client, url) {
  const connection = new client(url);
  return connection;
}

export function selectDB(connection, dbName) {
  return connection.db(dbName);
}

export function closeConnection(connection) {
  connection.close();
}
