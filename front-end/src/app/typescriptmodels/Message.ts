export class Message {
  chatId: string;
  body: string;
  user: string;
  type: number; // Identifies if it's the user that's logged in or the other participant
}
