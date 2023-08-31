import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const options = {};

export const renderRichText = (doc: any) => documentToReactComponents(doc, options);
