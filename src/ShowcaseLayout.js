// https://github.com/STRML/react-grid-layout/blob/master/README.md

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ShowcaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: props.initialLayout }
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function(l, i) {
      var tileClass = l.static ? "static " : "";
      var contentClass = l.shape || "normal";
      var tileStyle = {
        backgroundColor: contentClass === "normal" ? l.c : "transparent"
      };
      var contentStyle = {
        backgroundColor: contentClass !== "normal" ? l.c : ""
      };

      return (
        <div key={i} className={tileClass} style={tileStyle}>
          <div className={contentClass} style={contentStyle}>
            <span className="text">{l.m}</span>
          </div>
        </div>
      );
    });
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    this.setState({ compactType });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
  }

  onNewLayout() {
    this.setState({
      layouts: { lg: generateLayout() }
    });
  }

  render() {
    return (
      <div>
        <div className="hidden">
          Current Breakpoint: {this.state.currentBreakpoint} (
          {this.props.cols[this.state.currentBreakpoint]} columns)
        </div>
        <div className="hidden">
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button className="hidden" onClick={this.onNewLayout}>
          Generate New Layout
        </button>
        <button className="hidden" onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 20,
  onLayoutChange: function() {},
  cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
  initialLayout: generateLayout()
};

function generateLayout() {
  return [
    {
      x: 0,
      y: 0,
      w: 12,
      h: 6,
      i: "0",
      m: "a",
      c: "red",
      minW: 3,
      minH: 3,
      maxW: 12,
      maxH: 12
    },
    {
      x: 0,
      y: 6,
      w: 6,
      h: 6,
      i: "1",
      m: "b",
      c: "orange",
      minW: 3,
      minH: 3,
      maxW: 12,
      maxH: 12
    },
    {
      x: 6,
      y: 6,
      w: 6,
      h: 6,
      i: "2",
      m: "c",
      c: "yellow",
      minW: 3,
      minH: 3,
      maxW: 12,
      maxH: 12
    },
    {
      x: 0,
      y: 12,
      w: 3,
      h: 3,
      i: "3",
      m: "d",
      c: "lime",
      minW: 3,
      minH: 3,
      maxW: 4,
      maxH: 4,
      shape: "square"
    },
    {
      x: 3,
      y: 12,
      w: 3,
      h: 3,
      i: "4",
      m: "e",
      c: "plum",
      minW: 3,
      minH: 3,
      maxW: 4,
      maxH: 4,
      shape: "rounded"
    },
    {
      x: 6,
      y: 12,
      w: 3,
      h: 3,
      i: "5",
      m: "f",
      c: "khaki",
      minW: 3,
      minH: 3,
      maxW: 4,
      maxH: 4,
      shape: "hex"
    },
    {
      x: 9,
      y: 12,
      w: 3,
      h: 3,
      i: "6",
      m: "g",
      c: "cyan",
      minW: 3,
      minH: 3,
      maxW: 4,
      maxH: 4,
      shape: "hex"
    }
  ];
}
