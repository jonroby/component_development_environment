// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "./Tabs";
import ComponentView from "./ComponentView";
import TypesTable from "./TypesTable";
import SelectFakeProps from "./SelectFakeProps.js";
import { selectSnapshot } from "../redux/actions/cde";
import "./CDE.css";

class CDE extends Component {
  renderSelectedTab = () => {
    const Component = (
      <ComponentView
        selectedComponent={this.props.selectedComponent}
        fakeProps={this.props.fakeProps}
      />
    );

    const Custom = (
      <SelectFakeProps selectedComponent={this.props.selectedComponent} />
    );

    const Types = (
      <TypesTable selectedComponent={this.props.selectedComponent} />
    );

    const Code = this.props.propsAst ? (
      <pre className="code">{this.props.propsAst.filecontents}</pre>
    ) : null;

    const opts = { Component, Custom, Types, Code };
    return opts[this.props.selectedTab];
  };

  renderSnapshots = () => {
    if (!this.props.snapshotNames) return;

    const snapshots = this.props.snapshotNames.map(s => {
      return (
        <div
          className={
            s === this.props.selectedSnapshot ? "snapshot-selected" : "snapshot"
          }
          onClick={() => this.props.selectSnapshot(s)}
        >
          {s}
        </div>
      );
    });

    return <div className="snapshots-container">{snapshots}</div>;
  };

  render() {
    return (
      <div className="cde">
        <div>
          <div className="cde-component-name">
            <div>{this.props.selectedComponent}</div>
            {this.renderSnapshots()}
          </div>
          <Tabs />
          {this.renderSelectedTab()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedComponent: state.cde.selectedComponent,
  selectedTab: state.cde.selectedTab,
  snapshotNames: state.cde.snapshotNames,
  fakeProps: state.cde.fakeProps,
  selectedSnapshot: state.cde.selectedSnapshot,
  propsAst: state.cde.propsAst
});

export default connect(mapStateToProps, {
  selectSnapshot
})(CDE);
