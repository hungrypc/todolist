import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import { setTag, fetchTags, handlePopover } from '../actions';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const HorizontalLoginForm = (props) => {

    useEffect(() => {
        props.form.validateFields();
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                props.setTag(values)
                props.handlePopover(props.selectedTag, props.popover[props.selectedTag])
                props.fetchTags();
            }
        });
    };

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

    // Only show error after a field is touched.
    const tagError = isFieldTouched('tag') && getFieldError('tag');

    return (
        <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item validateStatus={tagError ? 'error' : ''} help={tagError || ''}>
                {getFieldDecorator([props.selectedTag], {
                    rules: [{ required: true }],
                })(
                    <Input
                        size="small"
                        placeholder={props.tags[props.selectedTag]}
                        autoComplete="off"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <Button size="small" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

const mapStateToProps= state => {
    return { 
        tags: state.tags.tags,
        selectedTag: state.tags.selectedTag ,
        popover: state.tags.popover
    }
};

export default connect(mapStateToProps, {
    setTag,
    fetchTags,
    handlePopover
})(WrappedHorizontalLoginForm);