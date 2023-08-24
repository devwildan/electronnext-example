import App from 'next/app';
import Page from './../layouts/page'
class Mainapp extends App {

    render() {
        const { Component } = this.props;
        return (
            <Page>
                <Component />
            </Page>
        );
    }
}

export default Mainapp;