import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Camera, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useCamera } from "../../camera/useCamera";
import { foods } from "../../content/foods";
import type { Food } from "../../content/foods";
import { detectFood } from "../../lib/foodDetection/detectFood";

interface FoodScannerProps {
  onFoodDetected: (food: Food) => void;
}

export default function FoodScanner({ onFoodDetected }: FoodScannerProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualPicker, setShowManualPicker] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const {
    isActive,
    isSupported,
    error: cameraError,
    isLoading: cameraLoading,
    startCamera,
    stopCamera,
    capturePhoto,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: "environment",
    quality: 0.8,
  });

  const handleCapture = async () => {
    setError(null);
    const photo = await capturePhoto();
    if (!photo) {
      setError("Failed to capture photo");
      return;
    }

    const imageUrl = URL.createObjectURL(photo);
    setCapturedImage(imageUrl);
    await stopCamera();
    await processImage(photo);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCapturedImage(imageUrl);
    setError(null);
    await processImage(file);
  };

  const processImage = async (file: File) => {
    setProcessing(true);
    setError(null);

    try {
      const result = await detectFood(file);

      if (result.success && result.foodName) {
        const matchedFood = foods.find(
          (f) => f.name.toLowerCase() === result.foodName!.toLowerCase(),
        );

        if (matchedFood) {
          onFoodDetected(matchedFood);
          resetScanner();
        } else {
          setError(
            `Food "${result.foodName}" not found in our database. Please select manually.`,
          );
          setShowManualPicker(true);
        }
      } else {
        setError(
          result.error || "Could not detect food. Please select manually.",
        );
        setShowManualPicker(true);
      }
    } catch (_err) {
      setError("Failed to process image. Please select manually.");
      setShowManualPicker(true);
    } finally {
      setProcessing(false);
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setError(null);
    setShowManualPicker(false);
    setProcessing(false);
  };

  const handleManualSelect = (food: Food) => {
    onFoodDetected(food);
    resetScanner();
  };

  if (isSupported === false) {
    return (
      <Card>
        <CardContent className="py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Camera is not supported on this device. Please use the Browse
              Foods tab.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (capturedImage) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Processing Image</CardTitle>
              <CardDescription>Analyzing food content...</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={resetScanner}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={capturedImage}
              alt="Captured food"
              className="w-full h-full object-cover"
            />
          </div>

          {processing && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">
                Analyzing image...
              </span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showManualPicker && (
            <div className="space-y-3">
              <h3 className="font-semibold">Select Food Manually</h3>
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {foods.map((food) => (
                  <button
                    key={food.name}
                    type="button"
                    onClick={() => handleManualSelect(food)}
                    className="p-2 border rounded-lg hover:border-primary transition-colors text-left"
                  >
                    <div className="aspect-square rounded overflow-hidden bg-muted mb-1">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-medium truncate">{food.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Food</CardTitle>
        <CardDescription>
          Take a photo or upload an image to get nutritional information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isActive ? (
          <div className="space-y-4">
            <Button
              onClick={startCamera}
              disabled={cameraLoading}
              className="w-full"
              size="lg"
              data-ocid="food.scan_button"
            >
              {cameraLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting Camera...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Open Camera
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <label htmlFor="file-upload">
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                asChild
                data-ocid="food.upload_button"
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {cameraError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{cameraError.message}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCapture} className="flex-1" size="lg">
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
              <Button onClick={stopCamera} variant="outline" size="lg">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
