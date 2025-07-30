// src/database/utils/neon-query.ts

import { neon } from "@database";

export async function findAll<T>(table: string): Promise<T[]> {
  const { rows } = await neon.query<T>(`SELECT * FROM "${table}"`);
  return rows;
}

export async function findById<T>(table: string, id: string): Promise<T | null> {
  const { rows } = await neon.query<T>(
    `SELECT * FROM "${table}" WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function findByEmail<T>(table: string, email: string): Promise<T | null> {
  const { rows } = await neon.query<T>(
    `SELECT * FROM "${table}" WHERE email = $1`,
    [email]
  );
  return rows[0] ?? null;
}

export async function findByUserId<T>(table: string, userId: string): Promise<T[]> {
  const { rows } = await neon.query<T>(
    `SELECT * FROM "${table}" WHERE "userId" = $1`,
    [userId]
  );
  return rows;
}

export async function findBySlug<T>(table: string, slug: string): Promise<T | null> {
  const { rows } = await neon.query<T>(
    `SELECT * FROM "${table}" WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function findByProvider<T>(
  table: string,
  provider: string,
  providerUserId: string
): Promise<T | null> {
  const { rows } = await neon.query<T>(
    `SELECT * FROM "${table}" WHERE provider = $1 AND "providerUserId" = $2`,
    [provider, providerUserId]
  );
  return rows[0] ?? null;
}

export async function insertInto<T>(
  table: string,
  data: Record<string, any>,
  returnInserted: boolean = true
): Promise<T | void> {
  const entries = Object.entries(data).filter(([_, v]) => v !== undefined);
  const keys = entries.map(([k]) => `"${k}"`);
  const values = entries.map(([_, v]) => v);
  const placeholders = keys.map((_, i) => `$${i + 1}`);

  const sql = `
    INSERT INTO "${table}" (${keys.join(", ")})
    VALUES (${placeholders.join(", ")})
    ${returnInserted ? "RETURNING *" : ""}
  `.trim();

  const result = await neon.query<T>(sql, values);
  return returnInserted ? result.rows[0] : undefined;
}

export async function updateById<T>(
  table: string,
  id: string,
  data: Record<string, any>,
  returnUpdated: boolean = true
): Promise<T | void> {
  const entries = Object.entries(data).filter(([_, v]) => v !== undefined);
  const keys = entries.map(([k]) => `"${k}"`);
  const values = entries.map(([_, v]) => v);
  const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");

  const sql = `
    UPDATE "${table}"
    SET ${setClause}
    WHERE id = $${keys.length + 1}
    ${returnUpdated ? "RETURNING *" : ""}
  `.trim();

  const result = await neon.query<T>(sql, [...values, id]);
  return returnUpdated ? result.rows[0] : undefined;
}

export async function deleteById(table: string, id: string): Promise<void> {
  await neon.query(`DELETE FROM "${table}" WHERE id = $1`, [id]);
}
