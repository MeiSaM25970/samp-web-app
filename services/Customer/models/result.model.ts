export type GenderType = "male" | "female" | "other" | undefined;
export type HowDidYouHearAboutUsType =
  | "social_media"
  | "email_sms"
  | "search_engines"
  | "ads"
  | "friend_referral"
  | undefined;

export interface IUserInfo {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: GenderType;
  national_code: string;
  company_name: string;
  business_card: boolean;
  goods_services_description: string;
  website: string;
  address: string;
  postal_code: string;
  how_did_you_hear_about_us: HowDidYouHearAboutUsType;
  membership_type_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  subscription_id: number;
  subscription_expiration: string | null;
}
