import M from '../messages';

// eslint-disable-next-line prefer-regex-literals
const EMAIL_PATTERN = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

const isEmail = (email: string) => EMAIL_PATTERN.test(email);

const requiredErrMsg = (field: string) => M.get('errors.required').replace('{field}', field);

const validateFieldForMinChar = (field: string, value: string, minChar: number) => value.length < minChar ? M.get('errors.minChars').replace('{field}', field).replace('{count}', minChar) : true;;
const validateFieldMaxValue = (field: string, value: string, maxValue: number) => +value > maxValue ? M.get('errors.maxValue').replace('{field}', field).replace('{maxValue}', maxValue) : true;;
const validateGreaterZero = (field: string, value: string) => +value <= 0 ? M.get('errors.greaterZero').replace('{field}', field) : true;

export { isEmail, EMAIL_PATTERN, requiredErrMsg, validateFieldForMinChar, validateFieldMaxValue, validateGreaterZero };