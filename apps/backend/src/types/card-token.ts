export type CardTokenResponse = {
  readonly status: string;
  readonly data: Data;
};

export type Data = {
  readonly id: string;
  readonly created_at: Date;
  readonly brand: string;
  readonly name: string;
  readonly last_four: string;
  readonly bin: string;
  readonly exp_year: string;
  readonly exp_month: string;
  readonly card_holder: string;
  readonly created_with_cvc: boolean;
  readonly expires_at: Date;
  readonly validity_ends_at: Date;
};
