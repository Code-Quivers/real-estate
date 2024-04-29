import * as fs from "fs";

type Token = {
  expirationInSeconds: number;
  tokenValue: string;
  createdAt: number;
};

export class TokenManager {
  private tokenInfo: Token | null = null;
  private filePath: string = "./uploads/paypalToken.json";

  constructor() {
    this.loadTokens();
  }

  private loadTokens() {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      this.tokenInfo = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or invalid JSON, initialize with empty array
      this.tokenInfo = null;
    }
  }

  private saveTokens() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.tokenInfo), "utf-8");
  }

  addToken(tokenValue: string, expirationInSeconds: number, createdAt: number) {
    this.tokenInfo = { tokenValue, expirationInSeconds, createdAt: createdAt };
    this.saveTokens();
  }

  isTokenValid(): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    if (this.tokenInfo) {
      const elapsedTime = currentTime - this.tokenInfo?.createdAt;
      return elapsedTime < this.tokenInfo.expirationInSeconds;
    } else {
      return false;
    }
  }

  getToken(): string {
    return this.tokenInfo?.tokenValue || "";
  }
}
