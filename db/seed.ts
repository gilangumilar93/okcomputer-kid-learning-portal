import { getDb } from "../api/queries/connection";
import { lessons } from "./schema";
import { CURRICULUM } from "../api/queries/curriculum";

async function seed() {
  const db = getDb();
  console.log("Seeding curriculum...");
  for (const lesson of CURRICULUM) {
    await db.insert(lessons).values({
      subject: lesson.subject,
      title: lesson.title,
      subtitle: lesson.subtitle,
      emoji: lesson.emoji,
      sortOrder: lesson.sortOrder,
      questions: lesson.questions,
    });
  }
  console.log("Done.");
}

seed().catch(console.error);
