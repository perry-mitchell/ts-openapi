import Joi from "joi";

type Common = {
  description?: string;
  required?: boolean;
  nullable?: boolean;
};

type StringParameters = {
  default?: string;
  example?: string;
  minLength?: number;
  maxLength?: number;
} & Common;

type StringEnumParameters = {
  values: string[];
  default?: string;
  example?: string;
} & Common;

type EmailParameters = StringParameters;
type UriParameters = StringParameters;
type HostnameParameters = StringParameters;
type PasswordParameters = {
  minLength?: number;
  maxLength?: number;
} & Common;
type UuidParameters = {
  example?: string;
} & Common;
type IpParameters = {
  example?: string;
} & Common;
type BinaryParameters = StringParameters;
type ByteParameters = StringParameters;

type DateParameters = {
  default?: string;
  example?: string;
} & Common;

type IntegerParameters = {
  default?: number;
  example?: number;
  minValue?: number;
  maxValue?: number;
} & Common;

type IntegerEnumParameters = {
  values: any[];
  default?: number;
  example?: number;
} & Common;

type NumberEnumParameters = IntegerEnumParameters;

type BooleanParameters = {
  default?: boolean;
  example?: boolean;
} & Common;

type ObjectParameters = {
  properties: Joi.SchemaMap<any>;
  default?: object;
  example?: object;
} & Common;

type ArrayParameters = {
  arrayType: Joi.SchemaLikeWithoutArray;
  default?: object;
  example?: object;
  minLength?: number;
  maxLength?: number;
} & Common;

export const Types = {
  String: (parameters?: StringParameters) => {
    let joiType = Joi.string();

    if (parameters) {
      const {
        description,
        required,
        nullable,
        maxLength,
        minLength,
        example
      } = parameters;

      if (description) {
        joiType = joiType.description(description);
      }

      if (typeof required === "boolean") {
        joiType = required ? joiType.required() : joiType.optional();
      }

      if (typeof nullable === "boolean" && nullable) {
        joiType = joiType.allow(null);
      }

      if (minLength) {
        joiType = joiType.min(minLength);
      }

      if (maxLength) {
        joiType = joiType.max(maxLength);
      }

      if (parameters.default) {
        joiType = joiType.default(parameters.default);
      }

      if (parameters.example) {
        joiType = joiType.example(example);
      }
    }

    return joiType;
  },

  StringEnum: (parameters: StringEnumParameters) => {
    return Types.String(parameters).valid(...parameters.values);
  },

  Email: (parameters?: EmailParameters) => {
    return Types.String(parameters).email();
  },

  Password: (parameters?: PasswordParameters) => {
    return Types.String(parameters).meta({ format: "password" });
  },

  Uuid: (parameters?: UuidParameters) => {
    return Types.String(parameters)
      .uuid({ version: "uuidv4" })
      .meta({ format: "uuid" })
      .min(36)
      .max(36);
  },

  Uri: (parameters?: UriParameters) => {
    return Types.String(parameters)
      .uri()
      .meta({ format: "uri" });
  },

  Hostname: (parameters?: HostnameParameters) => {
    return Types.String(parameters)
      .hostname()
      .meta({ format: "hostname" });
  },

  Ipv4: (parameters?: IpParameters) => {
    return Types.String(parameters)
      .ip({ version: ["ipv4"] })
      .meta({ format: "ipv4" })
      .min(7)
      .max(15);
  },

  Ipv6: (parameters?: IpParameters) => {
    return Types.String(parameters)
      .ip({ version: ["ipv6"] })
      .meta({ format: "ipv6" })
      .min(3)
      .max(45);
  },

  Binary: (parameters?: BinaryParameters) => {
    let joiType = Joi.binary();

    if (parameters) {
      const {
        description,
        required,
        nullable,
        maxLength,
        minLength,
        example
      } = parameters;

      if (description) {
        joiType = joiType.description(description);
      }

      if (typeof required === "boolean") {
        joiType = required ? joiType.required() : joiType.optional();
      }

      if (typeof nullable === "boolean" && nullable) {
        joiType = joiType.allow(null);
      }

      if (minLength) {
        joiType = joiType.min(minLength);
      }

      if (maxLength) {
        joiType = joiType.max(maxLength);
      }

      if (parameters.default) {
        joiType = joiType.default(parameters.default);
      }

      if (parameters.example) {
        joiType = joiType.example(example);
      }
    }

    return joiType;
  },

  Byte: (parameters?: ByteParameters) => {
    return Types.Binary(parameters).encoding("base64");
  },

  DateTime: (parameters?: DateParameters) => {
    let joiType = Joi.string()
      .isoDate()
      .max(24);

    if (parameters) {
      const { description, required, nullable } = parameters;

      if (description) {
        joiType = joiType.description(description);
      }

      if (typeof required === "boolean") {
        joiType = required ? joiType.required() : joiType.optional();
      }

      if (typeof nullable === "boolean" && nullable) {
        joiType = joiType.allow(null);
      }
    }

    return joiType;
  },

  Date: (parameters?: DateParameters) => {
    return Types.DateTime(parameters)
      .meta({ format: "date" })
      .min(10)
      .max(10);
  },

  Number: (parameters?: IntegerParameters) => {
    let joiType = Joi.number();

    if (parameters) {
      const {
        description,
        required,
        nullable,
        minValue,
        maxValue,
        example
      } = parameters;

      if (description) {
        joiType = joiType.description(description);
      }

      if (typeof required === "boolean" && required) {
        joiType = joiType.required();
      }

      if (typeof nullable === "boolean" && nullable) {
        joiType = joiType.allow(null);
      }

      if (typeof minValue === "number") {
        joiType = joiType.min(minValue);
      }

      if (typeof maxValue === "number") {
        joiType = joiType.max(maxValue);
      }

      if (typeof parameters.default === "number") {
        joiType = joiType.default(parameters.default);
      }

      if (typeof parameters.example === "number") {
        joiType = joiType.example(example);
      }
    }

    return joiType;
  },

  NumberEnum: (parameters: NumberEnumParameters) => {
    return Types.Number(parameters).valid(...parameters.values);
  },

  Integer: (parameters?: IntegerParameters) => {
    return Types.Number(parameters).integer();
  },

  IntegerEnum: (parameters: IntegerEnumParameters) => {
    return Types.Integer(parameters).valid(...parameters.values);
  },

  Boolean: (parameters?: BooleanParameters) => {
    let joiType = Joi.boolean().strict();

    if (parameters) {
      const { description, required, nullable, example } = parameters;

      if (description) {
        joiType = joiType.description(description);
      }

      if (typeof required === "boolean") {
        joiType = required ? joiType.required() : joiType.optional();
      }

      if (typeof nullable === "boolean" && nullable) {
        joiType = joiType.allow(null);
      }

      if (typeof parameters.default === "boolean") {
        joiType = joiType.default(parameters.default);
      }

      if (typeof parameters.example === "boolean") {
        joiType = joiType.example(example);
      }
    }

    return joiType;
  },

  Object: (parameters: ObjectParameters) => {
    const { properties, description, required, nullable, example } = parameters;
    let joiType = Joi.object().keys(properties);

    if (description) {
      joiType = joiType.description(description);
    }

    if (typeof required === "boolean") {
      joiType = required ? joiType.required() : joiType.optional();
    }

    if (nullable) {
      joiType = joiType.allow(null);
    }

    if (parameters.default) {
      joiType = joiType.default(parameters.default);
    }

    if (parameters.example) {
      joiType = joiType.example(example);
    }

    return joiType;
  },

  Array: (parameters: ArrayParameters) => {
    const {
      arrayType,
      description,
      required,
      nullable,
      example,
      minLength,
      maxLength
    } = parameters;
    let joiType = Joi.array().items(arrayType);

    if (description) {
      joiType = joiType.description(description);
    }

    if (typeof required === "boolean") {
      joiType = required ? joiType.required() : joiType.optional();
    }

    if (nullable) {
      joiType = joiType.allow(null);
    }

    if (parameters.default) {
      joiType = joiType.default(parameters.default);
    }

    if (parameters.example) {
      joiType = joiType.example(example);
    }

    if (minLength) {
      joiType = joiType.min(minLength);
    }

    if (maxLength) {
      joiType = joiType.max(maxLength);
    }

    return joiType;
  }
};
