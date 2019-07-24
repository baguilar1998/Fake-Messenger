import { User } from "./User";

export class Message {
  chatId: string;
  body: string;
  author: string;
  type: number; // Identifies if it's the user that's logged in or the other participant
}
