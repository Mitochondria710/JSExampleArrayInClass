"use client";

import { useState } from "react";

export default function Home() {
    // TODO build baseColors and shades
    const baseColors = ["#FF5733", "#33FF57", "#3357FF"];
    const shades = ["light", "medium", "dark"];

    const [selectedColor, setSelectedColor] = useState(baseColors[0]);
    const [selectedShade, setSelectedShade] = useState(shades[0]);


     const generateShade = (color, shade) => {
         const hex = color.substring(1);
         const rgb = parseInt(hex, 16);
         const r = (rgb >> 16) & 255;
         const g = (rgb >> 8) & 255;
         const b = rgb & 255;
    
         switch (shade) {
             case "light":
                 return `rgb(${r + 50}, ${g + 50}, ${b + 50})`;
             case "medium":
                 return color;
             case "dark":
                 return `rgb(${Math.max(0, r - 50)}, ${Math.max(
                     0,
                     g - 50
                 )}, ${Math.max(0, b - 50)})`;
             default:
                 return color;
         }
     };


     const palette = baseColors.map((color) => ({
         light: generateShade(color, "light"),
         medium: color,
         dark: generateShade(color, "dark"),
     }));

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Color Palette Generator</h1>
            <div className="mb-6">
                {/*TODO change value*/}
                <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="px-3 py-2 border rounded"
                >
                    {/* Display color options*/}
                    {baseColors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>

                {/*TODO change value*/}
                <select

                    value={selectedShade}
                    onChange={(e) => setSelectedShade(e.target.value)}
                    className="ml-4 px-3 py-2 border rounded"
                >
                {/*Display shade options*/}
                {shades.map((shade) => (
                    <option key={shade} value={shade}>
                        {shade}
                    </option>
                ))}
                </select>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/*building colors */}
                {palette.map((colors, index) => (
                    <div key={index} className="space-y-2">
                        <h3 className="font-semibold">{baseColors[index]}</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(colors).map(([shade, color]) => (
                                <div
                                    key={shade}
                                    className={`w-full aspect-square rounded border ${
                                        selectedColor === baseColors[index] &&
                                        selectedShade === shade
                                            ? "ring-2 ring-blue-500"
                                            : ""
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <h2 className="font-semibold mb-2">Selected Color</h2>
                {/*TODO uncomment when colors are built*/}
                <div
                    className="h-100  rounded border"
                    style={{
                        backgroundColor: generateShade(
                            selectedColor,
                            selectedShade
                        ),
                    }}
                />
            </div>
        </div>
    );
}
