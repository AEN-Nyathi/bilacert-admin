'use client';

import { useState, useCallback } from 'react';

export interface FormSubmissionPayload {
	formType: string; // 'contact', 'service-form', etc.
	serviceId?: string; // Optional: which service the form is for
	fullName: string;
	email: string;
	phone?: string;
	message?: string;
    [key: string]: any; // Allow other properties
}

export interface FormSubmissionResponse {
	success: boolean;
	message: string;
	submissionId?: string;
	error?: string;
}

export interface UseFormSubmissionState {
	isLoading: boolean;
	isSuccess: boolean;
	error: string | null;
	successMessage: string | null;
}

/**
 * Hook for submitting forms to Supabase via the /api/form-submissions endpoint
 */
export function useFormSubmission() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleSubmit = useCallback(
		async (payload: FormSubmissionPayload): Promise<FormSubmissionResponse | null> => {
			setIsLoading(true);
			setError(null);
			setSuccessMessage(null);

			try {
				const response = await fetch('/api/form-submissions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});

				const data = (await response.json()) as FormSubmissionResponse;

				if (!response.ok) {
					const errorMessage = data.error || 'Failed to submit form. Please try again.';
					setError(errorMessage);
					return { success: false, message: errorMessage };
				}

				setSuccessMessage(data.message);
				return data;
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'An unexpected error occurred';
				setError(errorMessage);
				return { success: false, message: errorMessage };
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const reset = useCallback(() => {
		setError(null);
		setSuccessMessage(null);
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		isSuccess: successMessage !== null,
		successMessage,
		handleSubmit,
		reset,
	};
}
