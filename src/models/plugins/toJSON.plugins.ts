import { Schema } from "mongoose";

// Interface for schema options with toJSON property
interface SchemaOptionsWithToJSON {
  toJSON?: {
    transform?: (doc: any, ret: any, options: any) => any;
  };
}

// Interface for schema with options
type SchemaWithOptions = Schema & {
  options: SchemaOptionsWithToJSON;
};

// Function to delete nested properties
const deleteAtPath = (
  obj: Record<string, any>,
  path: string[],
  index: number
): void => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  if (obj[path[index]]) {
    deleteAtPath(obj[path[index]], path, index + 1);
  }
};

const toJSONPlugin = (schema: SchemaWithOptions): void => {
  let transform: ((doc: any, ret: any, options: any) => any) | undefined;
  if (schema.options?.toJSON && schema.options?.toJSON?.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = {
    ...(schema.options.toJSON || {}),
    transform(doc: any, ret: any, options: any): any {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split("."), 0);
        }
      });

      // Customize default properties (optional)
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      // Apply custom transformation function if provided
      if (transform) {
        return transform(doc, ret, options);
      }
      return ret;
    },
  };
};

export default toJSONPlugin;
