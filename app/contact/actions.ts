"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const my_address = process.env.MY_MAIL_ADDRESS

export type ContactState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  // ▼ 追加: 入力内容を保持するためのフィールド
  inputs?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // バリデーションチェック
  const errors: ContactState["errors"] = {};
  if (!name || name.trim().length === 0) {
    errors.name = ["名前を入力してください"];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["有効なメールアドレスを入力してください"];
  }
  if (!message || message.trim().length < 10) {
    errors.message = ["お問い合わせ内容は10文字以上で入力してください"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "入力内容に誤りがあります。",
      errors,
      // ▼ 追加: 入力されていた値をそのまま返す
      inputs: { name, email, message },
    };
  }

  // メール送信処理
  if (my_address === undefined) {
    return {
      success: false,
      message: "メール送信の設定に問題があります。",
      inputs: { name, email, message },
    };
  }

  try {
    const data = await resend.emails.send({
      from: "react-next-portfolio@resend.dev",
      to: my_address, 
      subject: `【ポートフォリオ】お問い合わせ: ${name}様より`,
      text: `
--------------------------------------------------
以下の内容でお問い合わせを受け付けました。
--------------------------------------------------

■お名前
${name}

■メールアドレス
${email}

■メッセージ
${message}
      `,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return { 
        success: false, 
        message: "メール送信に失敗しました。",
        // ▼ 追加: APIエラー時も入力値を消さないように返す
        inputs: { name, email, message },
      };
    }

    return {
      success: true,
      message: "お問い合わせを受け付けました。ご連絡ありがとうございます！",
      // 成功時はフォームが消える（または完了画面になる）ので inputs は返さなくてOK
    };

  } catch (error: unknown) {
    console.error("Server Error:", error instanceof Error ? error.message : String(error));
    return {
      success: false,
      message: "サーバーエラーが発生しました。",
      // ▼ 追加: エラー時に入力値を返す
      inputs: { name, email, message },
    };
  }
}