import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';

import { createTodo, fetchTodos } from '../actions';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (

                <Form layout="vertical">
                    <Form.Item>
                        {getFieldDecorator('title')(<Input size="small" placeholder="Title" autoComplete="off"/>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('description')(<Input.TextArea  autoSize={{ minRows: 3, maxRows: 4 }} placeholder="Notes" autoComplete="off"/>)}
                    </Form.Item>
                    <Form.Item className="collection-create-form_last-form-item">
                        {getFieldDecorator('type', {
                            initialValue: 'success',
                        })(
                            <Radio.Group className="radio-tag">
                                <Radio value="success" className="radio-tag-success"></Radio>
                                <Radio value="warning" className="radio-tag-warning"></Radio>
                                <Radio value="error" className="radio-tag-error"></Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>

            );
        }
    },
);

class CollectionsPage extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    handleCancel = () => {
        // close form
        const { form } = this.formRef.props;
        form.resetFields();
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let desc = values.description;
            if (!desc) {
                desc = "";
            }
            const formValues = {
                title: values.title,
                description: desc,
                type: values.type,
                date: this.props.date,
                pending: true
            }
            console.log('Received values of form: ', formValues);
            this.props.createTodo(formValues);
            form.resetFields();
            this.props.onFormClose();
            this.props.fetchTodos(this.props.monthStart, this.props.monthEnd)
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Button type="primary" className="form-button" onClick={this.handleCreate}>
                    Add
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        date: state.todo.date
    }
}

export default connect(mapStateToProps, {
    createTodo,
    fetchTodos
})(CollectionsPage);