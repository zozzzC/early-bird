import { PartialUserObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type rawNotionOrderPage = {
  parent:
    | {
        type: "database_id";
        database_id: string;
      }
    | {
        type: "page_id";
        page_id: string;
      }
    | {
        type: "block_id";
        block_id: string;
      }
    | {
        type: "workspace";
        workspace: true;
      };
  icon:
    | {
        type: "emoji";
        emoji: EmojiRequest;
      }
    | null
    | {
        type: "external";
        external: {
          url: TextRequest;
        };
      }
    | null
    | {
        type: "file";
        file: {
          url: string;
          expiry_time: string;
        };
      }
    | null
    | {
        type: "custom_emoji";
        custom_emoji: CustomEmojiResponse;
      }
    | null;
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: objectUser;
  last_edited_by: objectUser;
  cover:
    | {
        type: "external";
        external: {
          url: TextRequest;
        };
      }
    | null
    | {
        type: "file";
        file: {
          url: string;
          expiry_time: string;
        };
      }
    | null;
  icon: null | string;
  parent: {
    type: string;
    database_id: string;
  };
  created_by: PartialUserObjectResponse;
  last_edited_by: PartialUserObjectResponse;
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  in_trash: boolean;
  url: string;
  public_url: string | null;
  properties: rawNotionOrderProps;
};

type objectUser = {
  object: "user";
  id: string;
};

type rawNotionOrderProps = {
  category: selectItem;
  media: filesAndMediaItem;
  price: numberItem;
  allergy: richtextItem;
  milk: multiSelectItem;
  size: multiSelectItem;
  extra: multiSelectItem;
  out_of_stock: checkboxItem;
  name: string;
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
  type: "files";
  files: Array<
    | {
        file: {
          url: string;
          expiry_time: string;
        };
        name: StringRequest;
        type?: "file";
      }
    | {
        external: {
          url: TextRequest;
        };
        name: StringRequest;
        type?: "external";
      }
  >;
};

type titleItem = {
  id: string;
  type: "title";
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
