import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {RepoIcon, SearchIcon} from "@primer/octicons-react";
import {useState} from "react";
import * as moment from "moment";

import Layout from "../../lib/components/layout";
import {
    ActionsBar,
    Loading,
    useDebouncedState
} from "../../lib/components/controls";
import {config, repositories} from '../../lib/api';
import {RepositoryCreateForm} from "../../lib/components/repositoryCreateForm";
import {Error} from "../../lib/components/controls"
import {useAPI, useAPIWithPagination} from "../../lib/hooks/api";
import {Paginator} from "../../lib/components/pagination";
import Container from "react-bootstrap/Container";
import {Link} from "../../lib/components/nav";
import {useRouter} from "../../lib/hooks/router";



const CreateRepositoryModal = ({show, error, onSubmit, onCancel}) => {

    const { response, error: err, loading } =useAPI(() => {
        return config.get()
    })

    const showError = (!!error) ? error : err
    if (loading)
        return (
            <Modal show={show} onHide={onCancel} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Repository</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Loading/>
                </Modal.Body>
            </Modal>
        )

    return (
        <Modal show={show} onHide={onCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create A New Repository</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RepositoryCreateForm config={response} error={showError} onSubmit={onSubmit} onCancel={onCancel}/>
            </Modal.Body>
        </Modal>
    );
};



const RepositoryList = ({ onPaginate, prefix, after, lastListUpdate = null  }) => {

    const {results, loading, error, nextPage} = useAPIWithPagination(() => {
        console.log('using API with pagination?');
        return repositories.list(prefix, after)
    }, [lastListUpdate, prefix, after])

    if (loading) return <Loading/>;
    if (!!error) return <Error error={error}/>

    return (
        <div>
            {results.map(repo => (
                <Row key={repo.id}>
                    <Col className={"mb-2 mt-2"}>
                        <Card>
                            <Card.Body>
                                <h5>
                                    <Link href={{
                                        pathname: `/repositories/:repoId/objects`,
                                        params: {repoId: repo.id}
                                    }}>
                                        {repo.id}
                                    </Link>
                                </h5>
                                <p>
                                    <small>
                                        created at <code>{moment.unix(repo.creation_date).toISOString()}</code> ({moment.unix(repo.creation_date).fromNow()})<br/>
                                        default branch: <code>{repo.default_branch}</code>,{' '}
                                        storage namespace: <code>{repo.storage_namespace}</code>
                                    </small>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}

            <Paginator after={after} nextPage={nextPage} onPaginate={onPaginate}/>
        </div>
    );
};



const Repositories = () => {
    const router = useRouter();

    console.log(router)

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [lastListUpdate, setLastListUpdate] = useState(new Date());

    const routerPfx = (!!router.query.prefix) ? router.query.prefix : "";
    const [prefix, setPrefix] = useDebouncedState(
        routerPfx,
        (prefix) => router.push({pathname: `/repositories`, query: {prefix}})
    );

    const createRepo = async (repo) => {
        try {
            await repositories.create(repo)
            setLastListUpdate(new Date())
            setCreateError(null)
            router.push({pathname: `/repositories/:repoId/objects`, params: {repoId: repo.name}});
        } catch (error) {
            setCreateError(error);
        }
    }

    return (
        <Layout>
            <Container fluid="xl" className="mt-3">
                <ActionsBar>
                    <Form className="float-left" style={{minWidth: 300}} onSubmit={e => { e.preventDefault(); }}>
                        <Form.Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <SearchIcon/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        placeholder="Find a repository..."
                                        autoFocus
                                        value={prefix}
                                        onChange={event => setPrefix(event.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                    </Form>
                    <ButtonToolbar className="justify-content-end mb-2">
                        <Button variant="success" onClick={() => {
                            setShowCreateModal(true);
                            setCreateError(null);
                        }}>
                            <RepoIcon/> Create Repository
                        </Button>
                    </ButtonToolbar>
                </ActionsBar>

                <RepositoryList
                    prefix={routerPfx}
                    lastListUpdate={lastListUpdate}
                    after={(!!router.query.after) ? router.query.after : ""}
                    onPaginate={after => {
                        console.log('paginate?')
                        const query = {after};
                        if (!!router.query.prefix) query.prefix = router.query.prefix;
                        router.push({pathname: `/repositories`, query});
                    }}
                    />

                <CreateRepositoryModal
                    onCancel={() => setShowCreateModal(false)}
                    show={showCreateModal}
                    error={createError}
                    onSubmit={(repo) => createRepo(repo)}/>
            </Container>
        </Layout>
    );
}

export default Repositories;