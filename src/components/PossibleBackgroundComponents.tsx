import DarkVeil from "./backgrounds/DarkVeil";
import RippleGrid from "./backgrounds/RippleGrid";
import SolidColorBackground from "./backgrounds/SolidColorBackground";

const PossibleBackgroundComponents:any = [
    {
        component: SolidColorBackground,
        text: "Düz Renk (Solid Color)",
        gifUrl: "",
        default: true,
        props: [
            {
                prop: "color",
                type: "color",
                defaultValue: "#1c2e4a"
            }
        ]
    },
    {
        "component": DarkVeil,
        "text": "Dark Veil",
        "gifUrl": "",
        "props": [
         {
            "prop": "hueShift",
            "type": "number",
            "min": 0,
            "max": 360,
            "defaultValue": 0
         },
                  {
            "prop": "noiseIntensity",
            "type": "number",
            "min": 0,
            "max": 0.2,
            "defaultValue": 0.05
         },
                  {
            "prop": "scanlineIntensity",
            "type": "number",
            "min": 0,
            "max": 1,
            "defaultValue": 0.5
         },
                  {
            "prop": "speed",
            "type": "number",
            "min": 0,
            "max": 3,
            "defaultValue": 1
         },
                  {
            "prop": "scanlineFrequency",
            "type": "number",
            "min": 0.5,
            "max": 5,
            "defaultValue": 1
         },
                  {
            "prop": "warpAmount",
            "type": "number",
            "min": 0,
            "max": 5,
            "defaultValue": 1
         },
                  {
            "prop": "resolutionScale",
            "type": "number",
            "min": 0,
            "max": 5,
            "defaultValue": 1
         }
]
    },
    {
        "component": RippleGrid,
        "text": "Ripple Grid",
        "gifUrl": "",
        "props": [
         {  
            "prop": "gridColor",
            "type": "color",
            "defaultValue": "#5227FF"
         },
         {
            "prop": "rippleIntensity",
            "type": "number",
            "min": 0,
            "max": 0.3,
            "defaultValue": 0.2
         },
                  {
            "prop": "gridSize",
            "type": "number",
            "min": 5,
            "max": 30,
            "defaultValue": 10
         },
                  {
            "prop": "gridThickness",
            "type": "number",
            "min": 5,
            "max": 50,
            "defaultValue": 15
         },
                  {
            "prop": "fadeDistance",
            "type": "number",
            "min": 0.5,
            "max": 3,
            "defaultValue": 1.5
         },
                  {
            "prop": "vignetteStrength",
            "type": "number",
            "min": 0.5,
            "max": 5,
            "defaultValue": 2
         },
                  {
            "prop": "glowIntensity",
            "type": "number",
            "min": 0,
            "max": 1,
            "defaultValue": 0.1
         },
                  {
            "prop": "glowIntensity",
            "type": "number",
            "min": 0,
            "max": 1,
            "defaultValue": 0.1
         },
                  {
            "prop": "opacity",
            "type": "number",
            "min": 0,
            "max": 1,
            "defaultValue": 1
         },
                  {
            "prop": "gridRotation",
            "type": "number",
            "min": 0,
            "max": 360,
            "defaultValue": 0
         },
                  {
            "prop": "mouseInteractionRadius",
            "type": "number",
            "min": 0.2,
            "max": 2,
            "defaultValue": 0.8
         },
                  {
            "prop": "mouseInteraction",
            "type": "boolean",
            "defaultValue": true
         },

                  {
            "prop": "enableRainbow",
            "type": "boolean",
            "defaultValue": false
         }
]
    }
];

export default PossibleBackgroundComponents