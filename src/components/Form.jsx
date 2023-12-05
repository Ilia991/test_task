import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import cn from 'classnames';
import { createUser } from '../server/fetch';

export const PostForm = ({ setCountPage }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        phone: '',
        position_id: 0,
        file: {},
      }}
      validate={(values) => {
        const errors = {};
        // eslint-disable-next-line
        if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
          values.email,
        )
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.name || values.name.length > 60) {
          errors.name = 'Error in name';
        }

        if (
          !/^[+]{0,1}380([0-9]{9})$/.test(values.phone)
          || values.phone.length !== 12
        ) {
          errors.phone = 'Error in phone number';
        }

        if (!values.position_id) {
          errors.position_id = 'Position not selected';
        }

        if (values.file.size > 5000000) {
          errors.file = 'The file should not weigh more than 5 Mb';
        } else if (!/jpeg|jpg/.test(values.file.type)) {
          errors.file = 'File type must be jpeg/jpg';
        }

        return errors;
      }}
      onSubmit={async (values, actions) => {
        const formData = new FormData();

        formData.append('email', values.email);
        formData.append('name', values.name);
        formData.append('phone', values.phone);
        formData.append('position_id', values.position_id);
        formData.append('photo', values.file);
        await createUser(formData).then(() => setCountPage(1));
        actions.setSubmitting(false);
      }}
    >
      {({
        isSubmitting,
        errors,
        values,
        touched,
        setFieldValue,
        setTouched,
      }) => (
        <Form className="form">
          <div className="form__container">
            <div className="form__field--wrapper">
              <div className="form__field--block">
                {values.name && errors.name && touched.name && (
                  <span className={cn('form__name', { error: errors.name })}>
                    Your name
                  </span>
                )}

                <Field
                  className={cn('form__field', {
                    'form__field--error': errors.name && touched.name,
                  })}
                  type="name"
                  name="name"
                  placeholder="Your name"
                />

                <ErrorMessage
                  className={cn('form__error', {
                    error: errors.name && touched.name,
                  })}
                  name="name"
                  component="span"
                />
              </div>
            </div>

            <div className="form__field--wrapper">
              <div className="form__field--block">
                {values.email && errors.email && touched.email && (
                  <span className={cn('form__name', { error: errors.email })}>
                    Email
                  </span>
                )}

                <Field
                  className={cn('form__field', {
                    'form__field--error': errors.email && touched.email,
                  })}
                  type="email"
                  name="email"
                  placeholder="Email"
                />

                <ErrorMessage
                  className={cn('form__error', {
                    error: errors.email && touched.email,
                  })}
                  name="email"
                  component="span"
                />
              </div>
            </div>

            <div className="form__field--wrapper">
              <div className="form__field--block">
                {values.phone && errors.phone && touched.phone && (
                  <span className={cn('form__name', { error: errors.phone })}>
                    Phone
                  </span>
                )}

                <Field
                  className={cn('form__field', {
                    'form__field--error': errors.phone && touched.phone,
                  })}
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  maxLength={12}
                />

                {values.phone && !errors.phone && (
                  <span className="form__helper">+38 (XXX) XXX - XX - XX</span>
                )}

                <ErrorMessage
                  className={cn('form__error', {
                    error: errors.phone && touched.phone,
                  })}
                  name="phone"
                  component="span"
                />
              </div>
            </div>

            <div className="form__radio-position">
              <div>Select your position</div>

              <div className="form__position">
                <div>
                  <Field type="radio" name="position_id" value="1" id="radio-1" />
                  {/* eslint-disable-next-line */}
                  <label className="form__label" htmlFor="radio-1">
                    Lawyer
                  </label>
                </div>

                <div>
                  <Field type="radio" name="position_id" value="2" id="radio-2" />
                  {/* eslint-disable-next-line */}
                  <label className="form__label" htmlFor="radio-2">
                    Content manager
                  </label>
                </div>

                <div>
                  <Field type="radio" name="position_id" value="3" id="radio-3" />
                  {/* eslint-disable-next-line */}
                  <label className="form__label" htmlFor="radio-3">
                    Security
                  </label>
                </div>

                <div>
                  <Field type="radio" name="position_id" value="4" id="radio-4" />
                  {/* eslint-disable-next-line */}
                  <label className="form__label" htmlFor="radio-4">
                    Designer
                  </label>
                </div>
              </div>
            </div>

            <div className="form__field--wrapper">
              <div className="form__field--block">
                <label
                  className={cn('form__field', 'form__field--label', {
                    'form__field--error': errors.file && touched.file,
                  })}
                  htmlFor="file"
                >
                  {values.file.name ? values.file.name : 'Upload your photo'}
                  <div className="form__btn">Upload</div>
                </label>
                <input
                  className="form__field--file"
                  type="file"
                  name="file"
                  placeholder="file"
                  id="file"
                  onChange={(event) => {
                    setTouched({ file: true });
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
                {errors.file && touched.file && (
                  <span
                    className={cn('form__error', {
                      error: errors.file && touched.file,
                    })}
                  >
                    {errors.file}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={cn('btn', {
                disabled:
                  (!values.name && errors.name)
                  || (!values.email && errors.email)
                  || (!values.phone && errors.phone)
                  || (!values.position_id && errors.position_id)
                  || (!values.file && errors.file),
              })}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
