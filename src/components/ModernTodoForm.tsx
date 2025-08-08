import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { z } from 'zod';
import { useTodoStore } from '../store';
import { Button, Card, Input, Text } from '../styles/components';

// Zod schema for form validation
const todoSchema = z.object({
  text: z
    .string()
    .min(1, 'Todo text is required')
    .max(100, 'Todo text must be less than 100 characters')
    .trim(),
});

type TodoFormData = z.infer<typeof todoSchema>;

const FormContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
`;

export const ModernTodoForm: React.FC = () => {
  const { addTodo } = useTodoStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      addTodo(data.text);
      reset();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <FormContainer padding="lg">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormRow>
          <InputWrapper>
            <FormGroup>
              <Input
                {...register('text')}
                placeholder="What needs to be done?"
                aria-label="New todo item"
                error={!!errors.text}
                disabled={isSubmitting}
              />
              {errors.text && (
                <ErrorText size="sm" role="alert">
                  {errors.text.message}
                </ErrorText>
              )}
            </FormGroup>
          </InputWrapper>

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting}
            style={{ minWidth: '120px' }}
          >
            {isSubmitting ? 'Adding...' : 'Add Todo'}
          </Button>
        </FormRow>
      </form>
    </FormContainer>
  );
};
