import { Dcupl } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';

let dcupl: Dcupl|null = null;

type DcuplInitOptions = {
    projectId: string;
    apiKey: string;
}

async function init({projectId, apiKey}: DcuplInitOptions) {

    if (dcupl) {
        return dcupl;
    }

    dcupl = new Dcupl({ config: { projectId, apiKey } });

    const loader = new DcuplAppLoader();

    dcupl.loaders.add(loader);

    await loader.config.fetch();

    await loader.process({
        applicationKey: 'headless-storefront',
    });

    await dcupl.init();

    console.log(dcupl.models.keys());

    return dcupl;
}

export async function createDcuplContext(options: DcuplInitOptions) {
    return {
        dcupl: await init(options),
    };
}
