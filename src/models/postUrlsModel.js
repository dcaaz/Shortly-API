import joi from "joi";

export const postUrlsSchema = joi.object({
    url: joi.string().required()
});