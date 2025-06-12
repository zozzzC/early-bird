export interface ExtraCostsResponse {
  [name: string]: ExtraCostsDetails;
}

export interface ExtraCostsDetails {
  key: string;
  name: string;
  type: "extra" | "milk" | "size";
  price: number;
}
