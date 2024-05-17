import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle textarea typing correctly', async () => {
    // Arrange
    render(<CommentInput id="thread-1" createComment={() => {}} />);
    const textarea = await screen.getByPlaceholderText(
      'Write your commentar here...',
    );

    // Action
    await userEvent.type(textarea, 'This is a test comment.');

    // Assert
    expect(textarea).toHaveValue('This is a test comment.');
  });

  it('should call createComment function with correct data when Post Commentar button is clicked', async () => {
    // Arrange
    const mockCreateComment = vi.fn();
    render(<CommentInput id="thread-1" createComment={mockCreateComment} />);
    const textarea = await screen.getByPlaceholderText(
      'Write your commentar here...',
    );
    await userEvent.type(textarea, 'This is a test comment.');
    const button = await screen.getByRole('button', { name: 'Post Commentar' });

    // Action
    await userEvent.click(button);

    // Assert
    expect(mockCreateComment).toHaveBeenCalledWith({
      id: 'thread-1',
      content: 'This is a test comment.',
    });
    expect(textarea).toHaveValue('');
  });

  it('should show alert when trying to post an empty comment', async () => {
    // Arrange
    window.alert = vi.fn();
    render(<CommentInput id="thread-1" createComment={() => {}} />);
    const button = await screen.getByRole('button', { name: 'Post Commentar' });

    // Action
    await userEvent.click(button);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(
      'Please enter your comment before posting.',
    );
  });
});
