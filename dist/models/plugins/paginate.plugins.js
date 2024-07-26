"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate = (schema) => {
    schema.statics.paginate = async function (filter, options = {}) {
        let sort = "";
        if (options.sortBy) {
            const sortingCriteria = [];
            options.sortBy.split(",").forEach((sortOption) => {
                const [key, order] = sortOption.split(":");
                sortingCriteria.push((order === "desc" ? "-" : "") + key);
            });
            sort = sortingCriteria.join(" ");
        }
        else {
            sort = "createdAt";
        }
        const limit = options.limit && parseInt(options.limit.toString(), 10) > 0
            ? parseInt(options.limit.toString(), 10)
            : 10;
        const page = options.page && parseInt(options.page.toString(), 10) > 0
            ? parseInt(options.page.toString(), 10)
            : 1;
        const skip = (page - 1) * limit;
        if (options.search) {
            const searchRegex = new RegExp(options.search, "i");
            filter = {
                ...filter,
                name: { $regex: searchRegex },
            };
        }
        const countPromise = this.countDocuments(filter).exec();
        let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);
        if (options.populate) {
            options.populate.split(",").forEach((populateOption) => {
                const populatePath = populateOption
                    .split(".")
                    .reverse()
                    .reduce((a, b) => {
                    return `${a}.populate.(${b})`;
                });
                docsPromise = docsPromise.populate(populatePath);
            });
        }
        docsPromise = docsPromise.exec();
        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values;
            const totalPages = Math.ceil(totalResults / limit);
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults,
            };
            return Promise.resolve(result);
        });
    };
};
exports.default = paginate;
