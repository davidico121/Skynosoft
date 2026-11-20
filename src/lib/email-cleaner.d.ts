export type CleanStatus = "ok" | "fixed" | "check" | "invalid" | "empty" | "duplicate";

export interface CleanResult {
  email: string;
  original: string;
  attempted?: string;
  status: CleanStatus;
  fixes: string[];
  flags: string[];
  role?: boolean;
  reason: string;
  suggestion: { email: string; why: string } | null;
  split?: { index: number; of: number };
  dupOf?: number;
  _prev?: CleanStatus;
}

declare const EmailCleaner: {
  init(tlds: string[], disposable: string[]): void;
  setDisposable(list: string[]): void;
  cleanCell(raw: unknown): CleanResult[];
  preclean(raw: unknown): { text: string; fixes: string[] };
};

export default EmailCleaner;
