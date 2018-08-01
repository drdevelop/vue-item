
    <!-- <nav aria-label="Page navigation">
        <ul class="pagination">
            <li :class="{'disabled':curPage==1}">
                <a href="javascript:;" @click="goPage(curPage==1?1:curPage-1)" aria-label="Previous">
                    <span aria-hidden="true">上一页</span>
                </a>
            </li>
            <li v-for="page in showPageBtn" :class="{'active':page==curPage}">
                <a href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a>
                <a href="javascript:;" v-else>···</a>
            </li>
            <li :class="{'disabled':curPage==pages}">
                <a href="javascript:;" @click="goPage(curPage==pages?pages:curPage+1)" aria-label="Next">
                    <span aria-hidden="true">下一页</span>
                </a>
            </li>
            <li :class="{'disabled':pages==pages}">
                <a href="javascript:void(0);">
                    共  {{pages}} 页
                </a>
            </li>
        </ul>
    </nav> -->

