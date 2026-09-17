

export class UpdateTodoDto {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) { }


    get values() {
        const returnObj: { [key: string]: any } = {};

        if(this.text) returnObj.text = this.text;
        if(this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    //this method is used to create a new instance of UpdateTodoDto and validate 
    // the input properties. It returns a tuple where the first element 
    // is an optional error message and the second element is an optional instance of UpdateTodoDto.
    static create(props:{[key: string]: any}): [string?, UpdateTodoDto?] {
        const { id, text , completedAt} = props;

        if(!id || isNaN(id)) return ['Id is required', undefined];

        const newCompledAt = completedAt
        if (completedAt ){
            const newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date'];
            }
        }

        return [undefined, new UpdateTodoDto(id,text, newCompledAt)]; 
    } 

}