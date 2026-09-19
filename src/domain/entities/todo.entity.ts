



export class TodoEntity {

    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly completeAt?: Date | null,
    ) { }


    get isComplete(): boolean {
        return !!this.completeAt;
    }

    public static fromObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completeAt } = object;

        if (!id) throw new Error('ID is required');
        if (!text) throw new Error('Text is required');


        let newCompleteAt
        if (completeAt) {
            newCompleteAt = new Date(completeAt);
            if (isNaN(newCompleteAt.getTime())) {
                throw new Error('Invalid completeAt date');
            }            
        }  

        return new TodoEntity(id, text, newCompleteAt);
    }


}






