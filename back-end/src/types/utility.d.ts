type NullablePartial<T> = { [P in keyof T]?: T[P] | null };

type OptionalWithMandatoryFields<T, K extends keyof T> = NullablePartial<T> & Pick<T, K>;

type IDMandatory<BaseType extends IDObj> = OptionalWithMandatoryFields<BaseType, 'id'>;

type IDObj = { id: string };

type ReturnPromiseFromIdObj<PromiseReturnValue> = (idObj: IDObj) => Promise<PromiseReturnValue>;

type ReturnPromise<PromiseReturnValue> = () => Promise<PromiseReturnValue>;

type ReturnPromiseFromIdMandatory<BaseType extends IDObj, PromiseReturnValue> = (
  argObj: IDMandatory<BaseType>
) => Promise<PromiseReturnValue>;
