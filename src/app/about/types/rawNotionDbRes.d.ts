type rawNotionDbRes = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: objectUser;
  last_edited_by: objectUser;
  cover: null | string;
  icon: null | string;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  properties: rawNotionPropsRes;
  url: string;
  public_url: string;
};

type objectUser = {
  object: "user";
  id: string;
};

type rawNotionPropsRes = {
  category: selectItem;
  media: filesAndMediaItem;
  price: numberItem;
  allergy: richtextItem;
  milk: multiSelectItem;
  size: multiSelectItem;
  extra: multiSelectItem;
  out_of_stock: checkboxItem;
  Name: string;
};

type numberItem = {
  id: string;
  type: number;
  number: number;
};

type selectItem = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  };
};

type multiSelectItem = {
  id: string;
  type: "multi_select";
  multi_select: multiSelectOptions[];
};

type multiSelectOptions = {
  id: string;
  name: string;
  color: string;
};

type richtextItem = {
  id: string;
  type: "rich_text";
  rich_text: [];
};

type filesAndMediaItem = {
  id: string;
  type: "";
  files: filesAndMediaOptions[];
};

type filesAndMediaOptions = {
  name: string;
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
};

type titleItem = {
  id: string;
  type: string;
  title: [
    {
      type: "text";
      text: {
        content: string | null;
        link: string | null;
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: null | string;
    },
  ];
};

type checkboxItem = {
  id: string;
  type: "checkbox";
  checkbox: boolean;
};
