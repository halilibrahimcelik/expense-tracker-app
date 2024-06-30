export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export const validateTitle = (title: string) => {
  const value = title?.trim();
  if (value && value.length < 3) {
    return {
      isError: true,
      errorMessage: 'Title must be at least 3 characters long',
    };
  }
  if (!value) {
    return {
      isError: true,
      errorMessage: 'Title is required',
    };
  }
  return {
    isError: false,
    errorMessage: '',
  };
};
export const validateDescription = (description: string) => {
  const value = description?.trim();
  if (value && value.length < 5) {
    return {
      isError: true,
      errorMessage: 'Description must be atleast 5 characters long',
    };
  }
  if (!value) {
    return {
      isError: true,
      errorMessage: 'Description is required',
    };
  }
  return {
    isError: false,
    errorMessage: '',
  };
};
export const validateCost = (cost: string) => {
  const value = cost?.trim();
  if (!value) {
    return {
      isError: true,
      errorMessage: 'Cost is required',
    };
  }

  return {
    isError: false,
    errorMessage: '',
  };
};
