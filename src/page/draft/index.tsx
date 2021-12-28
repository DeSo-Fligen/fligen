import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowRightImg from "../../assets/img/icon/ico-arrow-right.png";
import SendImg from "../../assets/img/icon/ico-send.png";

// import './draft.scss';
import Bench, { CodeBenchRef } from "./bench";
import { hooks } from "../../utils/hooks";
import { StorageKey } from "../../utils/constant";
import store from "../../state/store";
import PostsContract from "../../contracts/Posts.json"

enum DraftPage {
    Meta = 0,
    Bench,
}

function Draft() {
    const { t } = useTranslation()
    const tl = (suffix: string) => t(`draft.${suffix}`);
    const [page, set_page] = useState(DraftPage.Meta)
    const [title, set_title] = hooks.useLocalStorage(StorageKey.Draft.Title, '');
    const [desc, set_desc] = hooks.useLocalStorage(StorageKey.Draft.Desc, '');
    const codeBenchRef = useRef<CodeBenchRef>({ markdown: '' })
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const draft = store.getState().draft;
        (async () => {
            const networkId = await window.web3.eth.net.getId();
            const deployedNetwork = (PostsContract.networks as any)[networkId];
            const contract = new window.web3.eth.Contract(
                PostsContract.abi as any,
                deployedNetwork && deployedNetwork.address
            );
            // TODO 成功或失败 弹窗
            try {
                await contract.methods.addPost(
                    draft.title,
                    draft.desc,
                    draft.markdown
                ).send({
                    // TODO 使用当前账号
                    from: store.getState().account.accounts[0],
                });
                console.log('交易成功')
            } catch (e) {
                console.error('交易失败', e)
            }
        })();
    }
    return (
        <div className="w-full h-full flex items-center relative transition-all" style={{
            left: `-${page * 100}%`,
        }}>
            <div className="w-full h-full p-4 flex-shrink-0">
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700">{tl('title')}</label>
                    <input type="text" className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder={tl('ph_title')} value={title} onChange={e => set_title(e.target.value)}/>
                </div>
                <div className="my-3">
                    <label className="block text-sm font-medium text-gray-700">{tl('desc')}</label>
                    <div className="mt-1">
                        <textarea className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            rows={3} placeholder={tl('ph_desc')} value={desc} onChange={e => set_desc(e.target.value)}></textarea>
                    </div>
                </div>
                {/* TODO maybe 按钮封装成组件？ */}
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-stone-500 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                    onClick={() => set_page(DraftPage.Bench)}>
                    <div className="flex items-center text-white">
                        <span>{tl('next_step')}</span>
                        <img src={ArrowRightImg} className="w-8 h-8 ml-1" alt=""></img>
                    </div>
                </button>

                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onSubmit}>
                    <div className="flex items-center text-white">
                        <span>{tl('publish')}</span>
                        <img src={SendImg} className="w-8 h-8 ml-1" alt=""></img>
                    </div>
                </button>
            </div>
            <div className="w-full h-full flex-shrink-0 overflow-hidden p-4">
                <div className="h-[50px] flex items-center w-full">
                    <button className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-stone-500 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                        onClick={() => set_page(DraftPage.Meta)}>
                        <div className="flex items-center text-white">
                            <img src={ArrowRightImg} className="w-8 h-8 mr-1" style={{
                                transform:`rotate(180deg)`,
                            }} alt=""></img>
                            <span>{tl('bench_done')}</span>
                        </div>
                    </button>
                    <div className="mr-2 ml-4 text-xl font-bold">{title}</div>
                </div>
                { page === DraftPage.Bench ? <Bench ref={codeBenchRef}></Bench> : null}
            </div>
            
        </div>
    )
}
export default Draft;