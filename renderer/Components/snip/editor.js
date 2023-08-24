import CodeEditor from './../aceEditor';
import { Component } from 'react'; 
class editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.code,
            language: props.language,
            theme: 'tomorrow_night',
            languages: [
                "abap",
                "abc",
                "actionscript",
                "ada",
                "apache_conf",
                "asciidoc",
                "assembly_x86",
                "autohotkey",
                "batchfile",
                "c9search",
                "c_cpp",
                "cirru",
                "clojure",
                "cobol",
                "coffee",
                "coldfusion",
                "csharp",
                "css",
                "curly",
                "d",
                "dart",
                "diff",
                "dockerfile",
                "dot",
                "dummy",
                "dummysyntax",
                "eiffel",
                "ejs",
                "elixir",
                "elm",
                "erlang",
                "forth",
                "ftl",
                "gcode",
                "gherkin",
                "gitignore",
                "glsl",
                "golang",
                "groovy",
                "haml",
                "handlebars",
                "haskell",
                "haxe",
                "html",
                "html_ruby",
                "ini",
                "io",
                "jack",
                "jade",
                "java",
                "javascript",
                "json",
                "jsoniq",
                "jsp",
                "jsx",
                "julia",
                "latex",
                "less",
                "liquid",
                "lisp",
                "livescript",
                "logiql",
                "lsl",
                "lua",
                "luapage",
                "lucene",
                "makefile",
                "markdown",
                "mask",
                "matlab",
                "mel",
                "mushcode",
                "mysql",
                "nix",
                "objectivec",
                "ocaml",
                "pascal",
                "perl",
                "pgsql",
                "php",
                "powershell",
                "praat",
                "prolog",
                "properties",
                "protobuf",
                "python",
                "r",
                "rdoc",
                "rhtml",
                "ruby",
                "rust",
                "sass",
                "scad",
                "scala",
                "scheme",
                "scss",
                "sh",
                "sjs",
                "smarty",
                "snippets",
                "soy_template",
                "space",
                "sql",
                "stylus",
                "svg",
                "tcl",
                "tex",
                "text",
                "textile",
                "toml",
                "twig",
                "typescript",
                "vala",
                "vbscript",
                "velocity",
                "verilog",
                "vhdl",
                "xml",
                "xquery",
                "yaml"]
        };
    } 
    onChange = (newValue)=>{
        this.setState({ code: newValue })
        this.props.onDataChange(this.state.code, this.state.language)
    }
    handleChange = (e)=>{ 
        const lang = e.target.value;
        e.persist();
        this.setState({
            language: lang.toLowerCase()
        }); 
        this.props.onDataChange(this.state.code, lang.toLowerCase() )
    }
    render() {   
        return (
            <>
            <CodeEditor
                mode={this.props.language}
                theme={this.props.theme}
                setReadOnly = {false}
                onChange={this.onChange}
                style={{ flex:1 }}
                setValue = {this.props.code}
                ref={instance => { this.ace = instance; }} // Let's put things into scope
            />
                <div style={{ padding: '5px', display: 'flex' }}> 
                    <span style={{ flex: 1 }} />  
                    <select
                        id="lang"
                        onChange={this.handleChange}
                        value={this.state.language}
                        style={{ background: '#25282c', color: '#eee', border: 'none', outline: 'none' }}
                    >
                        {this.state.languages.map((lan) => {
                            return (
                                <option value={lan} key={lan}>
                                    {lan}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </>
        );
    }
}

export default editor;