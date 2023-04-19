import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $user_id: Int!) {
    addTodo(title: $title, user_id: $user_id) {
      id
      title
        user {
            user_id
        }
    }
  }
`;

export default function AddTodo() {
    let input;
    const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
        variables: {
          title: "placeholder",
          someOtherVariable: 1234,
          user_id: 1
        },
      });
  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addTodo({ variables: { title: input.value }});
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }