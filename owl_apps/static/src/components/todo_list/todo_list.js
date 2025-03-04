/** @odoo-module **/

import { registry } from '@web/core/registry';
import { useService } from '@web/core/utils/hooks';
const { Component, useState, onWillStart, useRef} = owl;

export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            task: { name:'', color:'#ff0000', completed:false },
            taskList: [],
            isEdit: false,
            activeId: false,
            search: useRef('search-input'),
        })
        
        this.orm = useService('orm');
        this.model = 'owl.todo.list';

        onWillStart(async ()=>{
            await this.getAllTasks()
        })
    }

    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ['name', 'color', 'completed']);
    }

    addTask(){
        this.resetForm();
        this.state.activeId = false;
        this.state.isEdit = false;
        
    }

    editTask(task){
        this.state.activeId = task.id;
        this.state.isEdit = true;
        this.state.task = {...task}

    }

    async saveTask(){
        if (!this.state.isEdit){
            await this.orm.create(this.model, [this.state.task]);
        } else{
            await this.orm.write(this.model, [this.state.activeId], this.state.task);
        }
    
        await this.getAllTasks();
    }



    resetForm(){
        this.state.task = { name:'', color:'#ff0000', completed:false };
    }

    async deleteTask(task){
        await this.orm.unlink(this.model, [task.id]);
        await this.getAllTasks();
    }

    async searchTask(){
        
        const text = this.state.search.el.value;
        this.state.taskList = await this.orm.searchRead(this.model, [['name', 'ilike', text]], ['name', 'color', 'completed']);
        
    }

    async toggleTask(e,task){

        await this.orm.write(this.model, [task.id], {completed: e.target.checked});
        await this.getAllTasks();
    }

    async updateColor(e,task){

        await this.orm.write(this.model, [task.id], {color: e.target.value});
        await this.getAllTasks();
    }
    
}

OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);