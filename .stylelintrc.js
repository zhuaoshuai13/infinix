module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  plugins: ["stylelint-order"],
  rules: {
    "unit-no-unknown": [true, { ignoreUnits: ["/rpx/", "/upx/"] }],
    "no-descending-specificity": null,
    "function-url-quotes": "always",
    "string-quotes": "double",
    indentation: 2,
    "unit-case": null,
    "color-hex-case": "lower",
    "color-hex-length": "long",
    "rule-empty-line-before": "always",
    "font-family-no-missing-generic-family-keyword": null,
    "block-opening-brace-space-before": "always",
    "property-no-unknown": null,
    "no-empty-source": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
    "function-url-quotes": null,
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": ["height", "width"],
  },
};
