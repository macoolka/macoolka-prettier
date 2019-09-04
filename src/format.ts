/**
 * code formatter
 * @desczh
 * 格式化代码
 * @file
 */
import * as prettier from 'prettier';
import { Options, BuiltInParserName } from 'prettier';
import { isString, isEmpty } from 'macoolka-predicate';
import { omit, merge } from 'macoolka-object';
import { MonadFunction, fromReader } from 'macoolka-app/lib/MonadFunction';
const formatContent = (content: string | object): string =>
    isString(content)
        ? content
        : JSON.stringify(content);

const getParserName = (extname: string): BuiltInParserName => {
    switch (extname) {
        case 'json':
            return 'json';
        case 'markdown':
            return 'markdown';
        case 'graphql':
            return 'graphql';
        case 'mdx':
            return 'mdx';
        case 'css':
            return 'css';
        case 'html':
            return 'html';
        default:
            return 'typescript';
    }
};
export interface PrettierInput extends Options {
    extname?: string;
    content: string | object;
}
/**
 * Format a code
 * @desczh
 * 格式化代码
 * @since 0.2.0
 */
export const format = (a: PrettierInput): string => {
    const extname = isEmpty(a.extname) ? 'ts' : a.extname;
    const parse = isEmpty(a.parser) ? getParserName(extname) : a.parser;
    const option = merge({}, {
        semi: false,
        singleQuote: true,
        printWidth: 120,
        parse,
    }, omit(a, ['content', 'extname']));

    return prettier.format(formatContent(a.content), option);
};
/**
 * Format a code Monad
 * @desczh
 * 格式化代码(Monad)
 * @since 0.2.0
 */
export const monadFormat: MonadFunction<PrettierInput, string> = fromReader(format);
