import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import ThreadInput from './ThreadInput';

/**
 * test scenario for ThreadInput component
 *
 * - ThreadInput component
 *  - should handle title typing correctly
 *  - should handle body typing correctly
 *  - should handle category typing correctly
 *  - should call createThread function with correct data when create button is clicked
 */

expect.extend(matchers);

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    render(
      <MemoryRouter>
        <ThreadInput createThread={() => {}} />
      </MemoryRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('Title');

    await userEvent.type(titleInput, 'Thread Title Test');

    expect(titleInput).toHaveValue('Thread Title Test');
  });

  it('should handle body typing correctly', async () => {
    render(
      <MemoryRouter>
        <ThreadInput createThread={() => {}} />
      </MemoryRouter>,
    );
    const bodyInput = await screen.getByPlaceholderText('Body');

    await userEvent.type(bodyInput, 'This is the body of the thread.');

    expect(bodyInput).toHaveValue('This is the body of the thread.');
  });

  it('should handle category typing correctly', async () => {
    render(
      <MemoryRouter>
        <ThreadInput createThread={() => {}} />
      </MemoryRouter>,
    );
    const categoryInput = await screen.getByPlaceholderText('Category');

    await userEvent.type(categoryInput, 'General');

    expect(categoryInput).toHaveValue('General');
  });

  it('should call createThread function with correct data when create button is clicked', async () => {
    const mockCreateThread = vi.fn();
    render(
      <MemoryRouter>
        <ThreadInput createThread={mockCreateThread} />
      </MemoryRouter>,
    );
    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'Thread Title Test');
    const bodyInput = await screen.getByPlaceholderText('Body');
    await userEvent.type(bodyInput, 'This is the body of the thread.');
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'General');
    const createButton = await screen.getByRole('button', { name: 'Create' });

    await userEvent.click(createButton);

    expect(mockCreateThread).toBeCalledWith({
      title: 'Thread Title Test',
      body: 'This is the body of the thread.',
      category: 'General',
    });
  });
});
