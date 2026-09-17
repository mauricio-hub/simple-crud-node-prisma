

export class CreateTodoDto {
    private constructor(
        public readonly text: string,
    ) { }

    //this method is used to create a new instance of CreateTodoDto and validate 
    // the input properties. It returns a tuple where the first element 
    // is an optional error message and the second element is an optional instance of CreateTodoDto.
    static create(props:{[key: string]: any}): [string?, CreateTodoDto?] {
        const { text } = props;

        if(!text) return ['Text is required', undefined];


        return [undefined, new CreateTodoDto(text)];
    } 

}