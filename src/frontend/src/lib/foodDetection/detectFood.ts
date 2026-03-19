export interface FoodDetectionResult {
  success: boolean;
  foodName?: string;
  calories?: number;
  error?: string;
}

export async function detectFood(
  imageFile: File,
): Promise<FoodDetectionResult> {
  const apiUrl = import.meta.env.VITE_FOOD_DETECT_URL;

  if (!apiUrl) {
    return {
      success: false,
      error: "Food detection API not configured. Please select food manually.",
    };
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Detection API request failed");
    }

    const data = await response.json();

    if (data.foodName) {
      return {
        success: true,
        foodName: data.foodName,
        calories: data.calories,
      };
    }

    return {
      success: false,
      error: "Could not detect food in image",
    };
  } catch (_error) {
    return {
      success: false,
      error: "Failed to connect to detection service",
    };
  }
}
