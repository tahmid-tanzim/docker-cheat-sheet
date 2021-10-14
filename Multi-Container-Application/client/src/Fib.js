import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ""
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get("/api/values/current");
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get("/api/values/all");
        this.setState({ seenIndexes: seenIndexes.data });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number.join(', '));
    }

    renderValues() {
        return this.state.values.map((i, val) => (
            <div key={i}>
                For index {i} calculated value is {val}
            </div>
        ));
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/values", {
            index: this.state.index
        });
        this.setState({ index: "" });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Index - </label>
                    <input
                        value={this.state.index}
                        onChange={e => this.setState({ index: e.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values</h3>
                {this.renderValues()}
            </div>
        );
    }
};

export default Fib;